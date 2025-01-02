import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/Firebase";

const collections = {
  certificates: collection(firestore, "certificates"),
  techstacks: collection(firestore, "techstacks"),
  experiences: collection(firestore, "experiences"),
  testimonials: collection(firestore, "testimonials"),
  projects: collection(firestore, "projects"),
};

type State = {
  certificate: { data: any[]; loading: boolean };
  techstack: { data: any[]; loading: boolean };
  experience: { data: any[]; loading: boolean };
  testimonial: { data: any[]; loading: boolean };
  projects: { data: any[]; loading: boolean };
};

type Actions = {
  fetchCertificates: () => Promise<void>;
  fetchTechstack: () => Promise<void>;
  fetchExperience: () => Promise<void>;
  fetchTestimonial: () => Promise<void>;
  fetchProjects: () => Promise<void>;
};

const initialState: State = {
  certificate: { data: [], loading: false },
  techstack: { data: [], loading: false },
  experience: { data: [], loading: false },
  testimonial: { data: [], loading: false },
  projects: { data: [], loading: false },
};

export const useStore = create<State & Actions>((set) => ({
  ...initialState,

  fetchCertificates: async () => {
    try {
      set((state) => ({
        certificate: { ...state.certificate, loading: true },
      }));
      const snapshot = await getDocs(collections.certificates);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ certificate: { data, loading: false } });
    } catch (error) {
      console.error("Error fetching certificates:", error);
      set({ certificate: { data: [], loading: false } });
    }
  },

  fetchTechstack: async () => {
    try {
      set((state) => ({ techstack: { ...state.techstack, loading: true } }));
      const snapshot = await getDocs(collections.techstacks);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ techstack: { data, loading: false } });
    } catch (error) {
      console.error("Error fetching techstack:", error);
      set({ techstack: { data: [], loading: false } });
    }
  },

  fetchExperience: async () => {
    try {
      set((state) => ({ experience: { ...state.experience, loading: true } }));
      const snapshot = await getDocs(collections.experiences);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ experience: { data, loading: false } });
    } catch (error) {
      console.error("Error fetching experience:", error);
      set({ experience: { data: [], loading: false } });
    }
  },

  fetchTestimonial: async () => {
    try {
      set((state) => ({
        testimonial: { ...state.testimonial, loading: true },
      }));
      const snapshot = await getDocs(collections.testimonials);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ testimonial: { data, loading: false } });
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      set({ testimonial: { data: [], loading: false } });
    }
  },

  fetchProjects: async () => {
    try {
      set((state) => ({ projects: { ...state.projects, loading: true } }));
      const snapshot = await getDocs(collections.projects);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      set({ projects: { data, loading: false } });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ projects: { data: [], loading: false } });
    }
  },
}));
