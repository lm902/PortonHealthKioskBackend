import {
  IAppointment,
  Appointment,
  IClinic,
  Clinic,
  IDoctor,
  Doctor,
} from "../model";
import { MongooseFilterQuery } from "mongoose";
import { authenticated } from "../util";
import { Service } from "egg";

export default class ClinicService extends Service {
  @authenticated("clinic")
  public async createAppointment(doc: IAppointment) {
    const appointment = new Appointment(doc);
    return appointment.save();
  }

  @authenticated("clinic")
  public async updateAppointment(
    conditions: MongooseFilterQuery<
      Pick<
        IAppointment,
        | "_id"
        | "familyName"
        | "givenName"
        | "age"
        | "startTime"
        | "endTime"
        // | "address"
        | "phone"
        // | "email"
        // | "insurance"
        | "clinicId"
        | "checkedIn"
      >
    >,
    doc: IAppointment
  ) {
    return Appointment.update(conditions, doc).exec();
  }

  @authenticated("admin")
  public async createClinic(doc: IClinic) {
    const clinic = new Clinic(doc);
    return clinic.save();
  }

  @authenticated("admin")
  public async updateClinic(
    conditions: MongooseFilterQuery<
      Pick<
        IClinic,
        | "streetAddress"
        | "city"
        | "postcode"
        | "phone"
        | "email"
        | "name"
        // | "adminId"
      >
    >,
    doc: IClinic
  ) {
    return Clinic.update(conditions, doc).exec();
  }

  @authenticated("clinic")
  public async createDoctor(doc: IDoctor) {
    const doctor = new Doctor(doc);
    return doctor.save();
  }

  @authenticated("clinic")
  public async updateDoctor(
    conditions: MongooseFilterQuery<
      Pick<IDoctor, "phone" | "email" | "_id" | "doctorname">
    >,
    doc: IAppointment
  ) {
    return Doctor.update(conditions, doc).exec();
  }
}
