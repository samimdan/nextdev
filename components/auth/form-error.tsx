/* -------------------------------------------------------------------------- */
/*                           Handiling Error message                          */
/* -------------------------------------------------------------------------- */
import { AlertCircle } from "lucide-react";
/* ------------------------------ End Of Import ----------------------------- */
export const FormError = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="text-sm text-red-600 p-3 rounded-md flex gap-2 items-center">
      <AlertCircle size={24} />
      <p>{message}</p>
    </div>
  );
};
