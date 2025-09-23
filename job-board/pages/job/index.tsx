import { FaShareAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
import JobCard from "@/components/JobCard";
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import { useState } from "react";
import ApplicationModal from "@/components/ApplicationModal";

export default function JobDetails() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/images/nike-logo.png"
            alt="Company logo"
            width={64}
            height={64}
            className="rounded-full object-contain"
          />
          <div>
            <p className="font-semibold">Nike</p>
            <p className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-1" /> (San Francisco, CA)
            </p>
          </div>
        </div>
        <Button
          onClick={() => alert("Shared job listing")}
          aria-label="Share job"
        >
          <FaShareAlt size={20} className="text-gray-600" />
        </Button>
      </header>

      {/* Job title */}
      <h2 className="text-2xl font-bold">Senior UI Developer</h2>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
        <span>Posted 5 days ago</span>
        <span className="w-1 h-1 rounded-full bg-black"></span>
        <span>Full-time</span>
        <span className="w-1 h-1 rounded-full bg-black"></span>
        <span>Senior-Level</span>
        <span className="w-1 h-1 rounded-full bg-black"></span>
        <span>Remote</span>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <FaMoneyBillWave className="text-green-600" />
        $60,000 – $80,000 / year
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-10 max-w-md">
        <Button
          className="bg-[var(--primary)] text-white flex-1"
          onClick={() => setIsOpen(true)}
        >
          Apply Now
        </Button>
        <Button className="border-2 border-[var(--primary)] text-[var(--primary)] flex-1">
          Save
        </Button>
      </div>

      <ApplicationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Job description */}
      <section className="prose max-w-none mb-10">
        <h3 className="text-2xl font-bold mb-2">About the Job</h3>
        <p>
          We’re looking for a passionate frontend developer to join our growing
          engineering team. You’ll help us design and build beautiful,
          accessible, and performant web experiences.
        </p>
      </section>

      {/* Responsibilities */}
      <section className="prose max-w-none mb-10">
        <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
        <ul className="list-disc list-inside">
          <li>Develop and maintain web applications with React and Next.js</li>
          <li>Collaborate with designers and backend engineers</li>
          <li>Write clean, reusable, and testable code</li>
        </ul>
      </section>

      {/* Required skills */}
      <section className="prose max-w-none mb-10">
        <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
        <ul className="list-disc list-inside">
          <li>Proficiency in React, Next.js, and TypeScript</li>
          <li>Strong understanding of Tailwind CSS</li>
          <li>Knowledge of accessibility best practices</li>
        </ul>
      </section>

      {/* Ideal candidate */}
      <section className="prose max-w-none mb-10">
        <h3 className="text-xl font-semibold mb-2">The Ideal Candidate</h3>
        <ul className="list-disc list-inside">
          <li>Has 3+ years of frontend experience</li>
          <li>Thrives in a collaborative environment</li>
          <li>Enjoys solving complex UI challenges</li>
        </ul>
      </section>

      {/* Benefits */}
      <section className="prose max-w-none mb-10">
        <h3 className="text-xl font-semibold mb-2">Benefits</h3>
        <ul className="list-disc list-inside">
          <li>Health, dental, and vision insurance</li>
          <li>Flexible working hours</li>
          <li>Remote-first culture</li>
        </ul>
      </section>

      {/* More jobs from this company */}
      <Carousel title="More jobs from Nike" ariaLabel="popular job postings">
        {[...Array(5)].map((_, i) => (
          <li key={`popular-${i}`}>
            <JobCard />
          </li>
        ))}
      </Carousel>

      {/* Similar jobs */}
      <Carousel title="Similar Jobs" ariaLabel="popular job postings">
        {[...Array(5)].map((_, i) => (
          <li key={`popular-${i}`}>
            <JobCard />
          </li>
        ))}
      </Carousel>
    </main>
  );
}
