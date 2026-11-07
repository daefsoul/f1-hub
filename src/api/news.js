// Vercel serverless function: tukar RSS BBC Sport F1 ke JSON (tajuk dan link sahaja)
const FEED = "https://feeds.bbci.co.uk/sport/formula1/rss.xml";

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const pick = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim() : "";
};

export default async function handler(req, res) {
  try {
    const r = await fetch(FEED);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const xml = await r.text();
    const items = (xml.match(/<item>[\s\S]*?<\/item>/g) || []).slice(0, 20).map((i) => ({
      title: decode(pick(i, "title")),
      link: pick(i, "link"),
      date: pick(i, "pubDate"),
      source: "BBC Sport",
    }));
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");
    res.status(200).json(items);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
