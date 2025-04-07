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
  
  interface PatientActionDialogsProps {
    patientId: string;
    openActivate: boolean;
    openDeactivate: boolean;
    onActivateClose: () => void;
    onDeactivateClose: () => void;
    onActivateAccount: (id: string) => Promise<void>;
    onDeactivateAccount: (id: string) => Promise<void>;
  }
  
  export function PatientActionDialogs({
    patientId,
    openActivate,
    openDeactivate,
    onActivateClose,
    onDeactivateClose,
    onActivateAccount,
    onDeactivateAccount,
  }: PatientActionDialogsProps) {
    return (
      <>
        
        {/* Activate Account Dialog */}
        <AlertDialog open={openActivate} onOpenChange={onActivateClose}>
          <AlertDialogContent className="border-0 shadow-lg rounded-lg bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-teal-700 font-bold text-lg">
                Confirm Patient Activation
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Are you sure you want to activate this patient account?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-slate-300 hover:bg-slate-100 text-slate-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => onActivateAccount(patientId)}
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
                Confirm Patient Deactivation
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600">
                Are you sure you want to deactivate this patient account?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-slate-300 hover:bg-slate-100 text-slate-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => onDeactivateAccount(patientId)}
              >
                Deactivate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }
  