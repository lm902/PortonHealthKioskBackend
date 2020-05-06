import * as mongoose from 'mongoose'
import { IAddress, Address } from './address'
import { IUser, User } from './user'

export type ClinicQuery = mongoose.MongooseFilterQuery<
  Pick<
    IClinic,
    | 'address'
    | 'phone'
    | 'email'
    | 'name'
    | 'ownerId'
    | 'formFields'
    | 'isEnabled'
  >
>

export interface IClinic extends mongoose.Document {
  name: string
  phone: string
  email?: string
  address: IAddress
  ownerId: string
  formFields: string[]
  isEnabled: IUser
}
export const Clinic = mongoose.model<IClinic>(
  'Clinic',
  new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: { type: Address, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    formFields: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CheckInFormField',
        required: true
      }
    ],
    isEnabled: { type: User, required: true }
  })
)
