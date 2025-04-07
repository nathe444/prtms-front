import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPatientsQuery } from "../../store/apis/patient/patientApi";
import { Loader2, PlusCircle, Search, UserCog, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const GetPatients: React.FC = () => {
  const navigate = useNavigate();
  const { data: patients, isLoading, isError } = useGetPatientsQuery();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleCreatePatient = () => {
    navigate("/patient/create");
  };

  const filteredPatients = React.useMemo(() => {
    if (!patients) return [];
    return patients.filter(
      (patient) =>
        `${patient.firstName} ${patient.fatherName} ${patient.grandFatherName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        patient.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cardNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-teal-600" />{" "}
        <span className="font-bold text-teal-600">Loading patients...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
        Unable to load patient data. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="border-none shadow-none">
        <CardHeader className="rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
            <div className="flex items-center">
              <UserCog className="h-6 w-6 text-teal-600 mr-2" />
              <CardTitle className="text-2xl font-bold text-teal-600">
                Patient Directory
              </CardTitle>
            </div>
            <Button
              onClick={handleCreatePatient}
              className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <PlusCircle className="mr-2 h-4 w-4 text-white/90" />
                <span className="text-white/90">New Patient</span>
              </div>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone or card number..."
              className="pl-8 bg-slate-50 border-0 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {patients && patients.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg border-0 shadow-sm">
              <UserCog className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                No Patients Yet
              </h3>
              <p className="text-slate-500 mb-4">
                Start by adding new patients to the system
              </p>
              <Button
                onClick={handleCreatePatient}
                className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <PlusCircle className="mr-2 h-4 w-4 text-white/90" />
                  <span className="text-white/90">New Patient</span>
                </div>
              </Button>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-lg shadow-sm">
              <p className="text-slate-500">
                No patients match your search criteria.
              </p>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden bg-white shadow-md">
              <Table>
                <TableHeader className="bg-teal-600/95">
                  <TableRow className="border-0">
                    <TableHead className="font-medium text-white/90">
                      Patient
                    </TableHead>
                    <TableHead className="font-medium text-white/90">
                      Card Number
                    </TableHead>
                    <TableHead className="font-medium text-white/90">
                      Contact
                    </TableHead>
                    <TableHead className="font-medium text-white/90">
                      Status
                    </TableHead>
                    <TableHead className="font-medium text-white/90 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      className="hover:bg-teal-100 border-b  border-teal-200 last:border-0 transition-colors duration-150 cursor-pointer"
                      onClick={() => navigate(`/patient/${patient.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9 bg-teal-100 text-teal-700">
                            <AvatarFallback>
                              {patient.firstName.charAt(0)}
                              {patient.fatherName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-800">
                              {`${patient.firstName} ${patient.fatherName}`}
                            </div>
                            <div className="text-sm text-slate-500">
                              {patient.sex} •{" "}
                              {new Date(
                                patient.dateOfBirth
                              ).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
                        >
                          {patient.cardNumber}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-slate-600">
                          <Phone className="h-3.5 w-3.5 mr-2 text-teal-500" />
                          {patient.phoneNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={patient.isActive ? "default" : "secondary"}
                          className={
                            patient.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {patient.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/patient/edit/${patient.id}`);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GetPatients;
