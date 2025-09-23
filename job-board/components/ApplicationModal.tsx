import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PhoneInput, { type Value } from "react-phone-number-input";
import { useDropzone } from "react-dropzone";
import "react-phone-number-input/style.css";
import { ApplicationModalProps } from "@/interfaces";
import Button from "./Button";

export default function ApplicationModal({
  isOpen,
  onClose,
}: ApplicationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<Value | undefined>();
  const [resume, setResume] = useState<File | null>(null);
  const [why, setWhy] = useState("");
  const [charCount, setCharCount] = useState(0);

  // File upload
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setResume(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
    onDrop,
  });

  const labelStyle = "block text-sm font-medium";
  const inputStyle = "mt-1 w-full rounded-lg border p-2";

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl  max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <DialogTitle className="text-xl font-bold">
            Apply for Senior UI Developer role at Nike
          </DialogTitle>

          {/* Form */}
          <form className="mt-6 space-y-4">
            {/* Full name */}
            <div>
              <label className={`${labelStyle}`} htmlFor="fullname">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`${inputStyle}`}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className={`${labelStyle}`} htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputStyle}`}
                required
              />
              <p className="mt-1 text-xs text-right text-blue-600">
                We’ll send updates here
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className={`${labelStyle}`} htmlFor="phone-number">
                Phone Number{" "}
                <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <PhoneInput
                id="phone-number"
                international
                countryCallingCodeEditable={false}
                defaultCountry="ZW"
                value={phone}
                onChange={setPhone}
                className={inputStyle}
              />
            </div>

            {/* Upload Resume */}
            <div>
              <label className={labelStyle}>
                Upload Resume (PDF or Docx)
                <span className="text-red-500">*</span>
              </label>
              <div
                {...getRootProps()}
                className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} required />
                <p className="text-sm text-gray-600">
                  {resume
                    ? resume.name
                    : "Drag & drop your resume here, or click to browse files"}
                </p>
              </div>
            </div>

            {/* Why Interested */}
            <div className="relative">
              <label className={`${labelStyle}`}>
                Why are you interested in this role?{" "}
                <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <textarea
                value={why}
                placeholder="Share your motivation for applying..."
                onChange={(e) => {
                  setWhy(e.target.value);
                  setCharCount(e.target.value.length);
                }}
                className={`pb-4 ${inputStyle}`}
                rows={5}
              />
              <p className="absolute bottom-2.5 right-2.5 mt-1 text-xs text-gray-400">
                {charCount}/1000
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={onClose}
                className="border-2 border-gray-500 text-gray-500 w-full shadow-2xl max-w-30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className=" bg-[var(--primary)] text-white w-full shadow-2xl max-w-30"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
