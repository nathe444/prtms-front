import React, { useState } from "react";
import { z } from "zod";
import {
  User,
  MapPin,
  Phone,
  Calendar,
  FileText,
  Loader,
  IdCard,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreatePatientMutation } from "@/store/apis/patient/patientApi";

interface PatientFormData {
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  sex: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  emergencyContactName?: string;
  emergencyContactPhoneNumber?: string;
  bloodGroup?: string;
  cardNumber: string;
}

const patientSchema = z.object({
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
      return !isNaN(parsedDate.getTime());
    },
    { message: "Invalid date format" }
  ),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, { message: "Invalid phone number" }),
  emergencyContactName: z
    .string()
    .min(2, {
      message: "Emergency contact name must be at least 2 characters",
    })
    .optional(),
  emergencyContactPhoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, {
      message: "Invalid emergency contact phone number",
    })
    .optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Rh+", "Rh-"])
    .optional(),
  cardNumber: z
    .string()
    .min(3, { message: "Card number must be at least 3 characters" }),
});

const CreatePatient: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"required" | "optional">(
    "required"
  );
  const [createPatient, { isLoading }] = useCreatePatientMutation();
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    fatherName: "",
    grandFatherName: "",
    sex: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",
    bloodGroup: "",
    cardNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();

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

  const renderField = (field: any) => {
    const { name, label, type, icon: Icon, options } = field;
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
              value={(formData[name as keyof PatientFormData] as string) || ""}
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
              value={(formData[name as keyof PatientFormData] as string) || ""}
              onChange={handleInputChange}
              placeholder={`Enter ${label}`}
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
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      icon: Calendar,
    },
    { name: "phoneNumber", label: "Phone Number", type: "tel", icon: Phone },
    { name: "address", label: "Address", type: "text", icon: MapPin },
    { name: "cardNumber", label: "CardNumber", type: "text", icon: IdCard },
  ];

  const optionalFields = [
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
    {
      name: "bloodGroup",
      label: "Blood Group",
      type: "select",
      icon: FileText,
      options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Rh+", "Rh-"],
    },
  ];

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
      const parsedData = patientSchema.parse(cleanedData);
      await createPatient(parsedData).unwrap();
      toast.success("Patient created successfully");
      navigate("/patients");
    } catch (err: any) {
      console.error("Patient creation failed", err);
      if (err instanceof z.ZodError) {
        const errorMap: { [key: string]: string } = {};
        err.errors.forEach((issue) => {
          const path = issue.path.join(".");
          errorMap[path] = issue.message;
        });
        setValidationErrors(errorMap);
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An unexpected error occurred during patient creation");
      }
    }
  };

  console.log(formData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-teal-600 p-6">
        <h2 className="text-3xl font-bold text-start">
          Create Patient Profile
        </h2>
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
                <Loader className="h-4 w-4 animate-spin text-white" />{" "}
                <span className="text-white">Creating Patient..</span>
              </div>
            ) : (
              <span className="text-white/90">Create Patient</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePatient;
