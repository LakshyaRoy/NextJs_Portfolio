import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore"; // Import Firebase functions
import { firestore } from "@/firebase/Firebase"; // Ensure this is correctly imported

// Define Firestore collections for each page
const dbCollectionforCertificates = collection(firestore, "certificates");
const dbCollectionforTechstack = collection(firestore, "techstacks");
const dbCollectionforExperience = collection(firestore, "experiences");
const dbCollectionforTestimonial = collection(firestore, "testimonials");
const dbCollectionforProjects = collection(firestore, "projects");

// Define types for state values and actions
type State = {
  certificate: { data: any[]; loading: boolean };
  techstack: { data: any[]; loading: boolean };
  experience: { data: any[]; loading: boolean };
  testimonial: { data: any[]; loading: boolean };
  projects: { data: any[]; loading: boolean };
};

type Actions = {
  setCertificate: (newData: any[]) => void;
  setTechstack: (newData: any[]) => void;
  setExperience: (newData: any[]) => void;
  setTestimonial: (newData: any[]) => void;
  setProjects: (newData: any[]) => void;
  setLoading: (isLoading: boolean) => void;
  fetchData: () => Promise<void>;
};

// Define the initial state
const initialState: State = {
  certificate: { data: [], loading: true },
  techstack: { data: [], loading: true },
  experience: { data: [], loading: true },
  testimonial: { data: [], loading: true },
  projects: { data: [], loading: true },
};

// Create the Zustand store
export const useStore = create<State & Actions>((set, get) => ({
  ...initialState,

  // Setters for each category
  setCertificate: (newData: any[]) =>
    set({ certificate: { data: newData, loading: false } }),
  setTechstack: (newData: any[]) =>
    set({ techstack: { data: newData, loading: false } }),
  setExperience: (newData: any[]) =>
    set({ experience: { data: newData, loading: false } }),
  setTestimonial: (newData: any[]) =>
    set({ testimonial: { data: newData, loading: false } }),
  setProjects: (newData: any[]) =>
    set({ projects: { data: newData, loading: false } }),

  // Set the loading state for all categories
  setLoading: (isLoading: boolean) => {
    set({
      certificate: { ...get().certificate, loading: isLoading },
      techstack: { ...get().techstack, loading: isLoading },
      experience: { ...get().experience, loading: isLoading },
      testimonial: { ...get().testimonial, loading: isLoading },
      projects: { ...get().projects, loading: isLoading },
    });
  },

  // Function to fetch and set data for all categories
  fetchData: async () => {
    try {
      // Set loading state to true before fetching
      set({
        certificate: { ...get().certificate, loading: true },
        techstack: { ...get().techstack, loading: true },
        experience: { ...get().experience, loading: true },
        testimonial: { ...get().testimonial, loading: true },
        projects: { ...get().projects, loading: true },
      });

      // Fetch data from Firestore collections
      const certificateSnapshot = await getDocs(dbCollectionforCertificates);
      const techstackSnapshot = await getDocs(dbCollectionforTechstack);
      const experienceSnapshot = await getDocs(dbCollectionforExperience);
      const testimonialSnapshot = await getDocs(dbCollectionforTestimonial);
      const projectsSnapshot = await getDocs(dbCollectionforProjects);

      // Process documents from each collection
      const certificates = certificateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const techstack = techstackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const experience = experienceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const testimonials = testimonialSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const projects = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update state with fetched data
      set({
        certificate: { data: certificates, loading: false },
        techstack: { data: techstack, loading: false },
        experience: { data: experience, loading: false },
        testimonial: { data: testimonials, loading: false },
        projects: { data: projects, loading: false },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({
        certificate: { data: [], loading: false },
        techstack: { data: [], loading: false },
        experience: { data: [], loading: false },
        testimonial: { data: [], loading: false },
        projects: { data: [], loading: false },
      });
    }
  },
}));
