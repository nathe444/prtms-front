import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetStaffsQuery } from "../../store/apis/staff/staffApi";
import {
  Loader2,
  PlusCircle,
  Search,
  UserCog,
  Phone,
  MapPin,
} from "lucide-react";
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

const GetStaffs: React.FC = () => {
  const navigate = useNavigate();
  const { data: staffs, isLoading, isError } = useGetStaffsQuery();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleCreateStaff = () => {
    navigate("/staff/create");
  };

  const filteredStaffs = React.useMemo(() => {
    if (!staffs) return [];
    return staffs.filter(
      (staff) =>
        `${staff.firstName} ${staff.fatherName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [staffs, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-teal-600" />{" "}
        <span className="font-bold text-teal-600">Loading staffs...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
        Unable to load staff data. Please try again later.
      </div>
    );
  }

  console.log(staffs);

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="border-none shadow-none">
        <CardHeader className="rounded-t-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
            <div className="flex items-center">
              <UserCog className="h-6 w-6 text-teal-600 mr-2" />
              <CardTitle className="text-2xl font-bold text-teal-600">
                Staff Directory
              </CardTitle>
            </div>
            <Button
              onClick={handleCreateStaff}
              className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {" "}
                <PlusCircle className="mr-2 h-4 w-4 text-white/90" />{" "}
                <span className="text-white/90">New Staff</span>{" "}
              </div>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or role..."
              className="pl-8 bg-slate-50 border-0 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {staffs && staffs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg border-0 shadow-sm">
              <UserCog className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                No Staff Members Yet
              </h3>
              <p className="text-slate-500 mb-4">
                Start building your medical team by adding staff members
              </p>
              <Button
                onClick={handleCreateStaff}
                className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {" "}
                  <PlusCircle className="mr-2 h-4 w-4 text-white/90" />{" "}
                  <span className="text-white/90">New Staff</span>{" "}
                </div>
              </Button>
            </div>
          ) : filteredStaffs.length === 0 ? (
            <div className="text-center py-8 bg-slate-50 rounded-lg shadow-sm">
              <p className="text-slate-500">
                No staff members match your search criteria.
              </p>
            </div>
          ) : (
            <div className=" rounded-xl overflow-hidden bg-white shadow-md">
              <Table>
                <TableHeader className="bg-teal-600/95">
                  <TableRow className="border-0">
                    <TableHead className="font-medium text-white/90">
                      Staff
                    </TableHead>
                    <TableHead className="font-medium text-white/90">
                      Role
                    </TableHead>
                    <TableHead className="font-medium text-white/90">
                      Contact Information
                    </TableHead>
                    <TableHead className="font-medium text-white/90">
                      Address
                    </TableHead>
                    <TableHead className="font-medium text-white/90 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaffs.map((staff) => (
                    <TableRow
                      key={staff.email}
                      className="hover:bg-teal-100 border-b  border-teal-200 last:border-0 transition-colors duration-150 cursor-pointer"
                      onClick={() => navigate(`/staff/${staff.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9 bg-teal-100 text-teal-700">
                            <AvatarFallback>
                              {staff.firstName.charAt(0)}
                              {staff.fatherName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-800">
                              {`${staff.firstName} ${staff.fatherName}`}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
                        >
                          {staff.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-slate-600">
                          <Phone className="h-3.5 w-3.5 mr-2 text-teal-500" />
                          {staff.phoneNumber}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        <div className="flex items-start">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-teal-500 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{staff.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/staff/${staff.id}/update`);
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

export default GetStaffs;
