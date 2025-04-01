import React, { useState } from "react";
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
} from "lucide-react";

interface StaffFormData {
  // Required Fields
  role: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  sex: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;

  // Optional Fields
  houseNumber?: string;
  specialization?: string;
  isTriage?: boolean;
  bloodGroup?: string;
  isActive?: boolean;
  qualifications?: string;
  previousExperience?: string;
  profilePicture?: string;
}

const CreateStaff: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"required" | "optional">(
    "required"
  );
  const [formData, setFormData] = useState<StaffFormData>({
    role: "Doctor",
    firstName: "",
    fatherName: "",
    grandFatherName: "",
    sex: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",

    // Optional Fields
    houseNumber: "",
    specialization: "",
    isTriage: false,
    bloodGroup: "",
    isActive: true,
    qualifications: "",
    previousExperience: "",
    profilePicture: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSubmit = () => {
    // TODO: Implement staff creation logic
    console.log(formData);
  };

  const renderField = (field: any) => {
    const { name, label, type, icon: Icon, options } = field;

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
              value={formData[name as keyof StaffFormData] || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">{`Select ${label}`}</option>
              {options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 file:mr-4 file:rounded-md file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-teal-700 hover:file:bg-teal-100"
            />
            {formData.profilePicture && (
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="mt-2 w-32 h-32 object-cover rounded-md border-2 border-teal-300"
              />
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
              value={formData[name as keyof StaffFormData] || ""}
              onChange={handleInputChange}
              placeholder={`Enter ${label}`}
              className="w-full px-3 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
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
      options: ["Doctor", "Nurse", "Admin"],
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
      options: ["Male", "Female", "Other"],
    },
    { name: "email", label: "Email", type: "email", icon: Mail },
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
      options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
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

  console.log(formData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-teal-600 p-6">
        <h2 className="text-3xl font-bold text-start">Create Staff Profile</h2>
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
          <span className="relative z-10 text-base md:text-lg">Required Information</span>
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
          <span className="relative z-10 text-base md:text-lg">Optional Details</span>
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
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>Create Staff</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
