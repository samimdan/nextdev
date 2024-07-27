"use clinet";

import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonType = {
  href: string;
  label: string;
};
export const BackButton = ({ href, label }: BackButtonType) => {
  return (
    <Button asChild variant={"link"} className="font-bold w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};
