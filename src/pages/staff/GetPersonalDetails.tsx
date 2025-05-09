import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  Clock,
  AlertCircle,
  Edit,
  UserCog,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useGetPersonalDetailsQuery } from "@/store/apis/staff/staffApi";

const GetPersonalDetails: React.FC = () => {
  const navigate = useNavigate();
  const { data: staff, error, isLoading } = useGetPersonalDetailsQuery();

  const handleUpdate = () => {
    navigate(`/staff/update-personal-details`, { state: staff });
  };

  const handleChangePassword = () => {
    navigate(`/staff/change-password`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-teal-600" />{" "}
        <span className="font-bold text-teal-600">
          Loading Personal Details...
        </span>
      </div>
    );
  }

  if (error || !staff) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center"></div>
        <Card className="shadow-sm border-0">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Error Loading Personal Details
            </h2>
            <p className="text-slate-600">
              Unable to load personal details. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-teal-700">Personal Details</h1>
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleChangePassword}
            className="w-fit bg-teal-600 hover:bg-teal-700 cursor-pointer flex items-center gap-0"
          >
            <Edit className="mr-2 h-4 w-4 text-white/90" />{" "}
            <span className="text-white/90">Change Password</span>
          </Button>

          <Button
            onClick={handleUpdate}
            className="w-fit bg-teal-600 hover:bg-teal-700 cursor-pointer flex items-center gap-0"
          >
            <Edit className="mr-2 h-4 w-4 text-white/90" />{" "}
            <span className="text-white/90">Update Details</span>
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
                  {staff?.firstName?.charAt(0) || ""}
                  {staff?.fatherName?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-slate-800">
                {`${staff?.firstName || ""} ${staff?.fatherName || ""} ${
                  staff?.grandFatherName || ""
                }`}
              </h2>
              <Badge className="mt-2 bg-teal-100 text-teal-800 hover:bg-teal-200 border-0">
                {staff?.role
                  ? staff.role.charAt(0).toUpperCase() + staff.role.slice(1)
                  : ""}
              </Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-slate-700">{staff?.email || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="text-slate-700">
                    {staff?.phoneNumber || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="text-slate-700">{staff?.address || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Date of Birth</p>
                  <p className="text-slate-700">
                    {staff?.dateOfBirth
                      ? new Date(staff.dateOfBirth).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500">Gender</p>
                  <p className="text-slate-700">
                    {staff?.sex
                      ? staff.sex.charAt(0).toUpperCase() + staff.sex.slice(1)
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
            <Tabs defaultValue="professional">
              <TabsList className="w-full bg-slate-50 px-5 gap-4  rounded-t-lg">
                <TabsTrigger
                  value="professional"
                  className="cursor-pointer flex-1 py-3 shadow-md rounded-md text-teal-600 data-[state=active]:bg-teal-600 data-[state=active]:text-white  font-medium"
                >
                  Professional Info
                </TabsTrigger>
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

              <TabsContent value="professional" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-teal-600" />
                      Professional Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Role</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.role
                            ? staff.role.charAt(0).toUpperCase() +
                              staff.role.slice(1)
                            : "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">
                          Registration Date
                        </p>
                        <p className="text-slate-800 font-medium">
                          {staff?.registrationDate
                            ? new Date(
                                staff.registrationDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Specialization</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.specialization || "Not specified"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Qualifications</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.qualifications || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-teal-600" />
                      Work Schedule
                    </h3>

                    {staff?.workSchedule ? (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-800 font-medium">
                          {staff.workSchedule}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-lg text-slate-500">
                        No work schedule specified
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                      <UserCog className="h-5 w-5 mr-2 text-teal-600" />
                      Experience
                    </h3>

                    {staff?.previousExperience ? (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-slate-800 font-medium">
                          {staff.previousExperience}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-lg text-slate-500">
                        No previous experience specified
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

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
                          {`${staff?.firstName || ""} ${
                            staff?.fatherName || ""
                          } ${staff?.grandFatherName || ""}`}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Date of Birth</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.dateOfBirth
                            ? new Date(staff.dateOfBirth).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Gender</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.sex
                            ? staff.sex.charAt(0).toUpperCase() +
                              staff.sex.slice(1)
                            : "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Blood Group</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.bloodGroup || "Not specified"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">Address</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.address || "N/A"}
                        </p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">House Number</p>
                        <p className="text-slate-800 font-medium">
                          {staff?.houseNumber || "Not specified"}
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
                              staff?.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                          <p className="text-slate-800 font-medium">
                            {staff?.isActive ? "Active" : "Inactive"}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <p className="text-sm text-slate-500">
                          First Login Status
                        </p>
                        <p className="text-slate-800 font-medium">
                          {staff?.isFirstLogin
                            ? "Has not logged in yet"
                            : "Has logged in"}
                        </p>
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
                        {staff?.emergencyContactName || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Contact Phone Number
                      </p>
                      <p className="text-slate-800 font-medium">
                        {staff?.emergencyContactPhoneNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetPersonalDetails;
