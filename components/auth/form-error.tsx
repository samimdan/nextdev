/* -------------------------------------------------------------------------- */
/*                           Handiling Error message                          */
/* -------------------------------------------------------------------------- */
import { AlertCircle } from "lucide-react";
/* ------------------------------ End Of Import ----------------------------- */
export const FormError = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive text-secondary-foreground p-3 rounded-md ">
      <AlertCircle size={24} />
      <p>{message}</p>
    </div>
  );
};
