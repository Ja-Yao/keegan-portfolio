import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export default function useUserInfo() {
  const [visitor, setVisitor] = useState<UAParser.IResult | null>(null);

  useEffect(() => {
    const parser = new UAParser();
    setVisitor(parser.getResult());
  }, []);

  if (!visitor) return null;

  return visitor;
}
