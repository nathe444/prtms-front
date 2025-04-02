import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StaffActionDialogsProps {
  staffId: string;
  openResend: boolean;
  openActivate: boolean;
  openDeactivate: boolean;
  onResendClose: () => void;
  onActivateClose: () => void;
  onDeactivateClose: () => void;
  onResendPassword: (id: string) => Promise<void>;
  onActivateAccount: (id: string) => Promise<void>;
  onDeactivateAccount: (id: string) => Promise<void>;
}

export function StaffActionDialogs({
  staffId,
  openResend,
  openActivate,
  openDeactivate,
  onResendClose,
  onActivateClose,
  onDeactivateClose,
  onResendPassword,
  onActivateAccount,
  onDeactivateAccount,
}: StaffActionDialogsProps) {
  return (
    <>
      {/* Resend Password Dialog */}
      <AlertDialog open={openResend} onOpenChange={onResendClose}>
        <AlertDialogContent className="border-0 shadow-lg rounded-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-teal-700 font-bold text-lg">
              Confirm Password Reset
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Are you sure you want to send a password reset email to this staff
              member?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-slate-300 hover:bg-slate-100 text-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => onResendPassword(staffId)}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Activate Account Dialog */}
      <AlertDialog open={openActivate} onOpenChange={onActivateClose}>
        <AlertDialogContent className="border-0 shadow-lg rounded-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-teal-700 font-bold text-lg">
              Confirm Account Activation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Are you sure you want to activate this account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-slate-300 hover:bg-slate-100 text-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => onActivateAccount(staffId)}
            >
              Activate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deactivate Account Dialog */}
      <AlertDialog open={openDeactivate} onOpenChange={onDeactivateClose}>
        <AlertDialogContent className="border-0 shadow-lg rounded-lg bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-teal-700 font-bold text-lg">
              Confirm Account Deactivation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Are you sure you want to deactivate this account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-slate-300 hover:bg-slate-100 text-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => onDeactivateAccount(staffId)}
            >
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
