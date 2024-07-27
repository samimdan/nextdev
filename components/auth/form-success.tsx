/* -------------------------------------------------------------------------- */
/*                          Handling success Message                          */

import { CheckCircle2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className=" text-secondary-foreground text-sm p-3 flex gap-2  items-center text-teal-400">
      <CheckCircle2 size={24} />
      <p>{message}</p>
    </div>
  );
};
