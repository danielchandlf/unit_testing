import sinon from 'sinon';
import * as AppointmentRepository from '@/modules/appointments/repository/appointment.repository';
import {
    createAppointment,
    deleteAppointment,
    getAppointment,
    getUserCreatedAppointments,
    updateAppointment
} from '@/modules/appointments/services/appointment.service';
import { Prisma } from '@prisma/client';
import { AppError } from '@/common/exceptions/appError';
import * as DateUtils from '@/utils/date';

describe('createAppointment', () => {
    afterEach(() => {
        sinon.restore();
    });

    test('it should return appointment object with the correct payload', async () => {
        // arrange
        const payload = {
            date: new Date('2021-04-07T10:00:00.000Z'),
            appointmentFor: 'Jane Doe',
            title: "example",
            appointmentBy: "test"
        };

        const expectedPayload = {
            ...payload,
            date: new Date(payload.date)
        };
        const createAppointmentStub = sinon
            .stub(AppointmentRepository, 'createAppointment')
            .resolves(expectedPayload);

        // act
        await createAppointment(payload);

        // assert
        sinon.assert.calledOnce(createAppointmentStub);
        sinon.assert.calledWith(createAppointmentStub, expectedPayload);
    });

    test('it should throw an error when appointment creation fails', async () => {
        const mockCreateAppointment = jest.spyOn(AppointmentRepository, 'createAppointment')
        mockCreateAppointment.mockResolvedValueOnce(null)
        const payload = {
            date: "",
            appointmentFor: 'Jane Doe',
            title: "example",
            appointmentBy: "test"
        };
        try {
            await createAppointment(payload)

        } catch (error) {
            expect(error.message).toBe("Error while creating the appointment.")
        }

    });
});

describe('getUserCreatedAppointments', () => {
    afterEach(() => {
        sinon.restore();
    });

    test('it should return the user created appointments with correct payload', async () => {
        const mockGetUserCreatedAppointments = jest.spyOn(AppointmentRepository, "getAppointmentsByUserId")
        const appointments = [
            {
                id: '1',
                title: 'Hello',
                date: new Date("2023-11-08T10:26:18.679Z"),
                appointmentBy: '1',
                appointmentFor: '1',
                isConfirmed: false,
                purpose: "",
                symptoms: "a",
                isCancelled: false,
                createdAt: new Date("2023-11-08T10:26:18.679Z"),
                updatedAt: new Date("2023-11-08T10:26:18.679Z"),
            }
        ]
        const payload = {
            userId: "1",
            limit: 1,
            page: 1
        }
        mockGetUserCreatedAppointments.mockResolvedValueOnce(appointments)

        const response = await getUserCreatedAppointments(payload)
        expect(mockGetUserCreatedAppointments).toHaveBeenCalledWith(
            payload.userId, payload.limit, payload.page, "id", "asc"
        )
        expect(response).toEqual(appointments)

    });

    test('it should throw error with for non-existing appointment', async () => {
        const mockGetUserCreatedAppointments = jest.spyOn(AppointmentRepository, "getAppointmentsByUserId")
        const payload = {
            userId: "-1",
            limit: 1,
            page: 1
        }
        mockGetUserCreatedAppointments.mockResolvedValueOnce(null)

        try {
            await getUserCreatedAppointments(payload)
        } catch (error) {
            expect(error.message).toBe("Error while fetching the appointments")
        }

    });
});

describe('getAppointment', () => {

    let mockGetAppointment: jest.SpyInstance;

    beforeEach(() => {
        mockGetAppointment = jest.spyOn(AppointmentRepository, 'getAppointmentById');
    });

    afterEach(() => {
        mockGetAppointment.mockRestore();
        sinon.restore();
    });

    test('it should return the appointment if it exists and belongs to the user', async () => {
        const appointments =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-11-08T10:26:18.679Z"),
            appointmentBy: '1',
            appointmentFor: '1',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        mockGetAppointment.mockResolvedValueOnce(appointments)
        const response = await getAppointment("1", "1")
        expect(response).toEqual(appointments)
    });
    test('it should throw notFound if the appointment does not exist', async () => {
        const appointmentId = "-1"
        const userId = "1"
        mockGetAppointment.mockResolvedValueOnce(null)
        try {
            await getAppointment(appointmentId, userId)
        } catch (error) {
            expect(error.message).toBe(`Appointment with Id ${appointmentId} could not be found.`)
        }

    });

    test('it should throw notFound if the appointment does not belong to the user', async () => {
        const appointments =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-11-08T10:26:18.679Z"),
            appointmentBy: '100',
            appointmentFor: '101',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        mockGetAppointment.mockResolvedValueOnce(appointments)
        const appointmentId = "1"
        const userId = "200"
        try {
            await getAppointment(appointmentId, userId)
        } catch (error) {
            expect(error.message).toBe(`Appointment with Id ${appointmentId} could not be found.`)
        }

    });

    test('it should throw the error thrown by AppointmentRepository.getAppointmentById', async () => {
        const expectedError = new Error("notFound")
        mockGetAppointment.mockImplementation(() => {
            throw expectedError
        })
        try {
            await getAppointment("-1", "-1")
        } catch (error) {
            expect(error).toBe(expectedError)
        }


    });

});

describe('updateAppointment', () => {

    let mockUpdateAppointment: jest.SpyInstance;
    let mockGetAppointment: jest.SpyInstance;

    beforeEach(() => {
        mockUpdateAppointment = jest.spyOn(AppointmentRepository, "updateAppointmentById");
    });

    afterEach(() => {
        sinon.restore();
    });

    test('it should return updated appointment with the correct payload', async () => {
        const appointmentId = "10"
        const oldData =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-12-08T10:26:18.679Z"),
            appointmentBy: '1',
            appointmentFor: '1',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        const newData =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-12-08T10:26:18.679Z"),
            appointmentBy: '1',
            appointmentFor: '1',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        mockGetAppointment = jest.spyOn(AppointmentRepository, "getAppointmentById")
        mockGetAppointment.mockResolvedValueOnce(oldData)
        mockUpdateAppointment.mockResolvedValueOnce(newData)
        const response = await updateAppointment(appointmentId, newData)
        expect(response).toEqual(`Appointment with Id ${appointmentId} has been updated successfully.`)
    });

    test('it should throw an error when appointment does not exist', async () => {
        const appointmentId = "10"
        const appointments =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-10-08T10:26:18.679Z"),
            appointmentBy: '1',
            appointmentFor: '1',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        mockGetAppointment = jest.spyOn(AppointmentRepository, "getAppointmentById")
        mockGetAppointment.mockResolvedValueOnce(null)

        try {
            await updateAppointment(appointmentId, appointments)
        } catch (error) {
            expect(error.message).toEqual(`Appointment with Id ${appointmentId} could not be found.`)
        }
    });

    test('it should throw an error when appointment date is in the past', async () => {
        const appointmentId = "10"
        const appointments =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-10-08T10:26:18.679Z"), //old date
            appointmentBy: '1',
            appointmentFor: '1',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        mockGetAppointment = jest.spyOn(AppointmentRepository, "getAppointmentById")
        mockGetAppointment.mockResolvedValueOnce(appointments)

        try {
            await updateAppointment(appointmentId, appointments)
        } catch (error) {
            expect(error.message).toEqual("Past appointmets cannot be updated. Please check the appointment date before update.")
        }

    });

    test('it should throw an error when updating the appointment fails', async () => {
        const appointmentId = "10"
        const appointments =
        {
            id: '1',
            title: 'Hello',
            date: new Date("2023-12-08T10:26:18.679Z"),
            appointmentBy: '1',
            appointmentFor: '1',
            isConfirmed: false,
            purpose: "",
            symptoms: "a",
            isCancelled: false,
            createdAt: new Date("2023-11-08T10:26:18.679Z"),
            updatedAt: new Date("2023-11-08T10:26:18.679Z"),
        }
        mockGetAppointment = jest.spyOn(AppointmentRepository, "getAppointmentById")
        mockGetAppointment.mockResolvedValueOnce(appointments)
        mockUpdateAppointment.mockResolvedValueOnce(null)

        try {
            await updateAppointment(appointmentId, appointments)
        } catch (error) {
            expect(error.message).toEqual(`Error while updating appointment with ID ${appointmentId}.`)
        }
    });
});

describe('deleteAppointment', () => {
    const appointmentId = '123';
    const userId = '456';

    let mockGetAppointmentById: jest.SpyInstance
    let mockDeleteAppointment: jest.SpyInstance;

    beforeEach(() => {
        mockGetAppointmentById = jest.spyOn(AppointmentRepository, "getAppointmentById")
        mockDeleteAppointment = jest.spyOn(AppointmentRepository, "deleteAppointmentById")
    })
    afterEach(() => {
        mockDeleteAppointment.mockRestore()
        mockDeleteAppointment.mockRestore()
        sinon.restore();
    });

    test('it should return  successful message', async () => {

        mockGetAppointmentById.mockResolvedValueOnce(1)
        mockDeleteAppointment.mockResolvedValueOnce(1)
        const result = await deleteAppointment(appointmentId, userId)
        expect(result).toBe(`Appointment with Id ${appointmentId} deleted successfully`)

    });

    test('it should throw a bad request error when appointment with given id is not available', async () => {
        mockGetAppointmentById.mockResolvedValueOnce(null)
        try {
            await deleteAppointment(appointmentId, userId)
        } catch (error) {
            expect(mockDeleteAppointment).not.toHaveBeenCalled()
            expect(error.message).toBe(`There is no appointments available with Id ${appointmentId}. Please check the appointment Id.`)
        }

    });


      test('it should throw an error when deleting the appointment fails', async () => {
        mockGetAppointmentById.mockResolvedValueOnce(1)
        mockDeleteAppointment.mockResolvedValueOnce(null)
        try {
            await deleteAppointment(appointmentId, userId)
        } catch (error) {
            expect(error.message).toBe(`Error while deleting the appointment for ID ${appointmentId}`)
        }
      });
});
