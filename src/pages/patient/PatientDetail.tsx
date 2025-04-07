import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  Edit,
  UserCog,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { useActivatePatientMutation, useDeactivatePatientMutation, useGetPatientByIdQuery } from "@/store/apis/patient/patientApi";

const PatientDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: patient, error, isLoading } = useGetPatientByIdQuery(id || "");
  const [activatePatient , {isLoading:activatingPatient}] = useActivatePatientMutation();
  const [deactivateAccount , {isLoading:deactivatingPatient}] = useDeactivatePatientMutation();

  const handleBack = () => {
    navigate("/patient/all");
  };

  const handleUpdate = () => {
    navigate(`/patient/${id}/update`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-teal-600" />{" "}
        <span className="font-bold text-teal-600">
          Loading Patient Details...
        </span>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mr-2 text-slate-600 hover:text-teal-700 hover:bg-teal-50"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>
        <Card className="shadow-sm border-0">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Error Loading Patient Details
            </h2>
            <p className="text-slate-600">
              Unable to load patient information. Please try again later.
            </p>
            <Button
              onClick={handleBack}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white/90 cursor-pointer"
            >
              Return to Patient List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-700">Patient Details</h1>

        <div className="flex gap-2 items-center">
          {patient.isActive ? (
            <Button
              className="w-fit bg-teal-600 hover:bg-teal-700 cursor-pointer flex items-center gap-0"
              onClick={() => setOpenDeactivateDialog(true)}
            >
              <span className="text-white/90">
                {" "}
                {deactivatingPatient ? (
                  <div className="flex items-center hover gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                    <span className="text-white">deactivating Account..</span>
                  </div>
                ) : (
                  <span className="text-white/90">Deactivate account</span>
                )}
              </span>
            </Button>
          ) : (
            <Button
              className="w-fit bg-teal-600 hover:bg-teal-700 cursor-pointer flex items-center gap-0"
              onClick={() => setOpenActivateDialog(true)}
            >
              <span className="text-white/90">
                {" "}
                {activatingPatient ? (
                  <div className="flex items-center hover gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                    <span className="text-white">activating Account..</span>
                  </div>
                ) : (
                  <span className="text-white/90">Activate account</span>
                )}
              </span>
            </Button>
          )}

          <Button
            onClick={handleUpdate}
            className="w-fit bg-teal-600 hover:bg-teal-700 cursor-pointer flex items-center gap-0"
          >
            <Edit className="mr-2 h-4 w-4 text-white/90" />{" "}
            <span className="text-white/90">Update Profile</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile summary */}
        <Card className="shadow-sm border-0 lg:col-span-1">
          <CardContent className="px-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 bg-teal-100 text-teal-700 mb-4">
                <AvatarFallback className="text-xl">
                  {patient?.firstName?.charAt(0) || ""}
                  {patient?.fatherName?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-slate-800">
                {`${patient?.firstName || ""} ${patient?.fatherName || ""} ${
                  patient?.grandFatherName || ""
                }`}
              </h2>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="text-slate-700">
                    {patient?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="text-slate-700">{patient?.address || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Date of Birth</p>
                  <p className="text-slate-700">
                    {patient?.dateOfBirth
                      ? new Date(patient.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Gender</p>
                  <p className="text-slate-700">
                    {patient?.sex
                      ? patient.sex.charAt(0).toUpperCase() +
                        patient.sex.slice(1)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Detailed information */}
        <Card className="shadow-sm border-0 lg:col-span-2">
          <CardContent className="p-0">
            <Tabs defaultValue="personal">
              <TabsList className="w-full bg-slate-50 px-5 gap-4  rounded-t-lg">
                <TabsTrigger
                  value="personal"
                  className="cursor-pointer flex-1 py-3 shadow-md rounded-md text-teal-600 data-[state=active]:bg-teal-600 data-[state=active]:text-white font-medium"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="emergency"
                  className="cursor-pointer flex-1 py-3 shadow-md rounded-md text-teal-600 data-[state=active]:bg-teal-600 data-[state=active]:text-white font-medium"
                >
                  Emergency Contact
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                      <User className="h-5 w-5 mr-2 text-teal-600" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Full Name</p>
                        <p className="text-slate-800 font-medium">
                          {`${patient?.firstName || ""} ${
                            patient?.fatherName || ""
                          } ${patient?.grandFatherName || ""}`}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Card No</p>
                        <p className="text-slate-800 font-medium">
                          {patient?.cardNumber || "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Phone No</p>
                        <p className="text-slate-800 font-medium">
                          {patient?.phoneNumber || "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Date of Birth</p>
                        <p className="text-slate-800 font-medium">
                          {patient?.dateOfBirth
                            ? new Date(patient.dateOfBirth).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Gender</p>
                        <p className="text-slate-800 font-medium">
                          {patient?.sex
                            ? patient.sex.charAt(0).toUpperCase() +
                              patient.sex.slice(1)
                            : "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Blood Group</p>
                        <p className="text-slate-800 font-medium">
                          {patient?.bloodGroup || "Not specified"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Address</p>
                        <p className="text-slate-800 font-medium">
                          {patient?.address || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                      <UserCog className="h-5 w-5 mr-2 text-teal-600" />
                      Account Status
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Account Status</p>
                        <div className="flex items-center mt-1">
                          <div
                            className={`h-2.5 w-2.5 rounded-full mr-2 ${
                              patient?.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                          <p className="text-slate-800 font-medium">
                            {patient?.isActive ? "Active" : "Inactive"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="p-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-teal-600" />
                    Emergency Contact Information
                  </h3>

                  <div className="bg-slate-50 p-5 rounded-lg space-y-4">
                    <div>
                      <p className="text-sm text-slate-500">Contact Name</p>
                      <p className="text-slate-800 font-medium">
                        {patient?.emergencyContactName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Contact Phone Number
                      </p>
                      <p className="text-slate-800 font-medium">
                        {patient?.emergencyContactPhoneNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* <StaffActionDialogs
        staffId={id!}
        openResend={openResendDialog}
        openActivate={openActivateDialog}
        openDeactivate={openDeactivateDialog}
        onResendClose={() => setOpenResendDialog(false)}
        onActivateClose={() => setOpenActivateDialog(false)}
        onDeactivateClose={() => setOpenDeactivateDialog(false)}
        onResendPassword={handleResendPassword}
        onActivateAccount={handleActivateAccoount}
        onDeactivateAccount={handleDeactivateAccoount}
      /> */}
    </div>
  );
};

export default PatientDetail;
