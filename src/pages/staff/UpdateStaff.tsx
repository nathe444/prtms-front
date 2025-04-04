import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  HeartPulse,
  FileText,
  Camera,
  CheckCircle2,
  Loader,
  Loader2,
} from "lucide-react";
import {
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
} from "@/store/apis/staff/staffApi";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const staffSchema = z.object({
  role: z.enum([
    "doctor",
    "nurse",
    "pharmacist",
    "receptionist",
    "laboratory_technologist",
    "cashier",
    "super_admin",
  ]),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  fatherName: z
    .string()
    .min(2, { message: "Father name must be at least 2 characters" }),
  grandFatherName: z
    .string()
    .min(2, { message: "Grandfather name must be at least 2 characters" }),
  sex: z.enum(["male", "female"]),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      const minAge = new Date();
      minAge.setFullYear(minAge.getFullYear() - 18);
      return parsedDate <= minAge;
    },
    { message: "You must be at least 18 years old" }
  ),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, { message: "Invalid phone number" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  emergencyContactName: z.string().min(2, {
    message: "Emergency contact name must be at least 2 characters",
  }),
  emergencyContactPhoneNumber: z.string().regex(/^\+?[0-9]{10,14}$/, {
    message: "Invalid emergency contact phone number",
  }),

  houseNumber: z.string().optional(),
  specialization: z.string().optional(),
  isTriage: z.boolean().optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Rh+", "Rh-"])
    .optional(),
  isActive: z.boolean().optional(),
  qualifications: z.string().optional(),
  previousExperience: z.string().optional(),
  profilePicture: z.string().optional(),
});

interface StaffFormData {
  role: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  sex: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;

  houseNumber?: string;
  specialization?: string;
  isTriage?: boolean;
  bloodGroup?: string;
  isActive?: boolean;
  qualifications?: string;
  previousExperience?: string;
  profilePicture?: string;
}

const UpdateStaff: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"required" | "optional">(
    "required"
  );
  const [formData, setFormData] = useState<StaffFormData>({
    role: "Doctor",
    firstName: "",
    fatherName: "",
    grandFatherName: "",
    sex: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",

    houseNumber: "",
    specialization: "",
    isTriage: false,
    bloodGroup: "",
    isActive: true,
    qualifications: "",
    previousExperience: "",
    profilePicture: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const [updateStaff, { isLoading }] = useUpdateStaffMutation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: staffDetail, isLoading: fetchingDetails } =
    useGetStaffByIdQuery(id!);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => {
          if (typeof value === "string") {
            return value.trim() !== "";
          }
          return value !== null && value !== undefined;
        })
      );

      const parsedData = staffSchema.parse(cleanedData);
      if (id) {
        await updateStaff({
          id,
          staffData: parsedData,
        }).unwrap();
      }
      toast.success("Staff updated successfully");
      navigate("/staffs");
    } catch (err: any) {
      console.error("staff update failed", err);

      if (err instanceof z.ZodError) {
        const errorMap: { [key: string]: string } = {};
        err.errors.forEach((issue) => {
          const path = issue.path.join(".");
          errorMap[path] = issue.message;
        });
        setValidationErrors(errorMap);
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else if (err?.error) {
        toast.error(err.error);
      } else {
        toast.error("An unexpected error occurred during staff update");
      }
    }
  };

  const renderField = (field: any) => {
    const { name, label, type, icon: Icon, options } = field;

    // Determine if this field has a validation error
    const errorMessage = validationErrors[name];

    switch (type) {
      case "select":
        return (
          <div key={name} className="flex flex-col space-y-2">
            <label className="flex items-center text-teal-600 font-medium">
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </label>
            <select
              name={name}
              value={(formData[name as keyof StaffFormData] as string) || ""}
              onChange={handleInputChange}
              className={cn(
                "w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500",
                errorMessage && "border-red-500 focus:ring-red-500"
              )}
            >
              <option value="">{`Select ${label}`}</option>
              {options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );

      case "switch":
        return (
          <div key={name} className="flex items-center space-x-3">
            <Icon className="h-5 w-5 text-teal-600" />
            <label className="text-teal-600 font-medium">{label}</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData[name as keyof StaffFormData] as boolean}
                onChange={(e) => handleSwitchChange(name, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );

      case "file":
        return (
          <div key={name} className="flex flex-col space-y-2">
            <label className="flex items-center text-teal-600 font-medium">
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </label>
            <input
              type="file"
              name={name}
              accept="image/*"
              onChange={handleFileUpload}
              className={cn(
                "w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500",
                errorMessage && "border-red-500 focus:ring-red-500"
              )}
            />
            {formData.profilePicture && (
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="mt-2 w-32 h-32 object-cover rounded-md border-2 border-teal-300"
              />
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={name} className="flex flex-col space-y-2">
            <label className="flex items-center text-teal-600 font-medium">
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={(formData[name as keyof StaffFormData] as string) || ""}
              onChange={handleInputChange}
              placeholder={`Enter ${label}`}
              readOnly={field.readonly}
              className={cn(
                "w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500",
                errorMessage && "border-red-500 focus:ring-red-500"
              )}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
        );
    }
  };

  const requiredFields = [
    {
      name: "role",
      label: "Role",
      type: "select",
      icon: User,
      options: [
        "doctor",
        "nurse",
        "pharmacist",
        "receptionist",
        "laboratory_technologist",
        "cashier",
        "super_admin",
      ],
    },
    { name: "firstName", label: "First Name", type: "text", icon: User },
    { name: "fatherName", label: "Father Name", type: "text", icon: User },
    {
      name: "grandFatherName",
      label: "Grandfather Name",
      type: "text",
      icon: User,
    },
    {
      name: "sex",
      label: "Sex",
      type: "select",
      icon: User,
      options: ["male", "female"],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      icon: Mail,
      readonly: true,
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      icon: Calendar,
    },
    { name: "phoneNumber", label: "Phone Number", type: "tel", icon: Phone },
    { name: "address", label: "Address", type: "text", icon: MapPin },
    {
      name: "emergencyContactName",
      label: "Emergency Contact Name",
      type: "text",
      icon: User,
    },
    {
      name: "emergencyContactPhoneNumber",
      label: "Emergency Contact Phone",
      type: "tel",
      icon: Phone,
    },
  ];

  const optionalFields = [
    { name: "houseNumber", label: "House Number", type: "text", icon: MapPin },
    {
      name: "specialization",
      label: "Specialization",
      type: "text",
      icon: HeartPulse,
    },
    {
      name: "isTriage",
      label: "Is Triage",
      type: "switch",
      icon: CheckCircle2,
    },
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      icon: FileText,
      options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Rh+", "Rh-"],
    },
    {
      name: "isActive",
      label: "Is Active",
      type: "switch",
      icon: CheckCircle2,
    },
    {
      name: "qualifications",
      label: "Qualifications",
      type: "text",
      icon: FileText,
    },
    {
      name: "previousExperience",
      label: "Previous Experience",
      type: "text",
      icon: FileText,
    },
    {
      name: "profilePicture",
      label: "Profile Picture",
      type: "file",
      icon: Camera,
    },
  ];

  useEffect(() => {
    if (staffDetail) {
      setFormData(staffDetail);
    }
  }, [staffDetail]);

  if (fetchingDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-teal-600" />{" "}
        <span className="font-bold text-teal-600">
          Loading staff Details...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-teal-600 p-6">
        <h2 className="text-3xl font-bold text-start">Update Staff Profile</h2>
      </div>

      <div className="flex border-b border-teal-300">
        <button
          className={`
            flex-1 p-4 text-lg font-semibold 
            relative 
            transition-all duration-300  cursor-pointer
            group
            ${
              activeTab === "required"
                ? "text-teal-600 font-bold"
                : "text-gray-600 hover:text-teal-600"
            }
          `}
          onClick={() => setActiveTab("required")}
        >
          <span className="relative z-10 text-base md:text-lg">
            Required Information
          </span>
          <div
            className={`
              absolute bottom-0 left-0 right-0 h-1 
              transition-transform duration-300 
              ${
                activeTab === "required"
                  ? "bg-teal-600 scale-x-100"
                  : "bg-transparent scale-x-0"
              }
            `}
          />
          <div
            className={`
              absolute inset-0 
              bg-teal-100 
              opacity-0 
              group-hover:opacity-10 
              transition-opacity 
              duration-300
            `}
          />
        </button>
        <button
          className={`
            flex-1 p-4 text-lg font-semibold 
            relative 
            transition-all duration-300  cursor-pointer
            group
            ${
              activeTab === "optional"
                ? "text-teal-600 font-bold"
                : "text-gray-600 hover:text-teal-600"
            }
          `}
          onClick={() => setActiveTab("optional")}
        >
          <span className="relative z-10 text-base md:text-lg">
            Optional Details
          </span>
          <div
            className={`
              absolute bottom-0 left-0 right-0 h-1 
              transition-transform duration-300 
              ${
                activeTab === "optional"
                  ? "bg-teal-600 scale-x-100"
                  : "bg-transparent scale-x-0"
              }
            `}
          />
          <div
            className={`
              absolute inset-0 
              bg-teal-100 
              opacity-0 
              group-hover:opacity-10 
              transition-opacity 
              duration-300
            `}
          />
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "required" ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requiredFields.map(renderField)}
            </div>
          </div>
        ) : (
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {optionalFields.map(renderField)}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8 space-x-4">
          <Button
            onClick={handleSubmit}
            className={cn(
              "w-full bg-teal-600 hover:bg-teal-700",
              "transition-all duration-200 ease-in-out",
              "shadow-lg hover:shadow-xl hover:shadow-teal-100",
              "cursor-pointer",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center hover gap-2">
                <Loader className="h-4 w-4 animate-spin" />{" "}
                <span className="text-white">Updating Staff..</span>
              </div>
            ) : (
              <span className="text-white/90">Update Staff</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
