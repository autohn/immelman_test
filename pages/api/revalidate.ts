export default async function handler(req: any, res: any) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
