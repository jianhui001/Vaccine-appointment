import AddPatient from "@/pages/my-service/my-patient/add-patient.vue";
import { defineStore } from "pinia";

interface Patient {
    name: string;
    _id: string;
}
export const myData = defineStore('my_data', {
    state: () => ({
        patient: {} as Patient
    }),
    actions: {
        addPatient(value: Patient) {
            this.patient = value;
        }
    }
})