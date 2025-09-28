import { FormEvent, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDropzone } from "react-dropzone";
import { ApplicationModalProps } from "@/interfaces";
import Button from "./Button";
import { useApplications } from "@/hooks/useApplications";
import { inputStyle, labelStyle } from "@/styles/styles";

export default function ApplicationModal({
  isOpen,
  onClose,
  job,
}: ApplicationModalProps) {
  const [resume, setResume] = useState<File | null>(null);
  const [why, setWhy] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { applyToJob } = useApplications();

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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!resume) {
      setErrorMsg("Resume is required.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("job", job.id.toString());
      formData.append("resume", resume);
      if (why) formData.append("cover_letter", why);

      const res = await fetch("/api/applications/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to submit application");
      const data = await res.json();
      console.log(`Data: ${data}`);

      setSuccessMsg("Application submitted successfully!");
      applyToJob(job.id, JSON.stringify(resume), why); // update context
      setResume(null);
      setWhy("");
      onClose(); // close modal on success
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl  max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <DialogTitle className="text-xl font-bold">
            Apply for {job.title} role at {job.company.name}
          </DialogTitle>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

            {/* Error/Success Messages */}
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-600 text-sm">{successMsg}</p>
            )}

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
                {loading ? "Submitting" : "Apply"}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
