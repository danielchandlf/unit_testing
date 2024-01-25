import { prismaMock } from '@tests/prismaTestSetup';
import { Appointment, Prisma } from '@prisma/client';
import {
    createAppointment,
    deleteAppointmentById,
    getAppointmentById,
    getAppointmentForUserId,
    getAppointmentsByUserId,
    updateAppointmentById
} from '@modules/appointments/repository/appointment.repository';

const appointmentObject = {
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

describe('createAppointment', () => {
    const mockAppointmentData: Prisma.AppointmentUncheckedCreateInput = {
        title: 'Hello',
        date: new Date("2023-11-08T10:26:18.679Z"),
        appointmentBy: '1',
        appointmentFor: '1'
    };

    //@ts-ignore
    const appointmentMockCreate = prismaMock.appointment.create

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('it should return created appointment with the valid appointment payload', async () => {
        const expectedResult = appointmentObject;
        appointmentMockCreate.mockResolvedValueOnce(expectedResult)
        const createdAppointment = await createAppointment(mockAppointmentData)
        expect(appointmentMockCreate).toHaveBeenCalledWith({
            data: mockAppointmentData
        })
        expect(createdAppointment).toEqual(expectedResult)

    });
});
describe('updateAppointment', () => {
    const mockAppointmentData: Prisma.AppointmentUncheckedCreateInput = {
        title: 'Hello',
        date: new Date(),
        appointmentBy: '1',
        appointmentFor: '1'
    };

    //@ts-ignore
    const appointmentMockUpdateMany = prismaMock.appointment.updateMany;

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('it should return updated appointment count', async () => {
        appointmentMockUpdateMany.mockResolvedValueOnce({ count: 1 })
        const updatedCount = await updateAppointmentById("1", mockAppointmentData);
        expect(appointmentMockUpdateMany).toHaveBeenCalledWith({
            data: mockAppointmentData,
            where:{
                id:"1",
                appointmentBy:"1"
            }
        })
        expect(updatedCount).toEqual({ count: 1 });
    });
});

describe('findById', () => {
    //@ts-ignore
    const mockFindUnique = prismaMock.appointment.findUnique;

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('it should return appointment with given id, if the payload is correct', async () => {
        const expectedResult = appointmentObject;
        mockFindUnique.mockResolvedValueOnce(expectedResult);
        const foundAppointment = await getAppointmentById('1');
        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: "1" }
        })
        expect(foundAppointment).toEqual(expectedResult);
    });

    test('it should return null for non-existing appoints', async () => {
        mockFindUnique.mockResolvedValueOnce(null);
        const foundAppointment = await getAppointmentById('-1');
        expect(mockFindUnique).toHaveBeenCalledWith({
            where: { id: "-1" }
        })
        expect(foundAppointment).toBeNull();
    });
});

describe('getAppointmentByUserId', () => {
    const mockAppointment: Prisma.AppointmentUncheckedCreateInput = {
        id: '1',
        title: 'Hello',
        date: new Date(),
        appointmentBy: '1',
        appointmentFor: '1'
    };

    //@ts-ignore
    const mockFindMany = prismaMock.appointment.findMany;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('it should return array of appointments when correct payload is provided ', async () => {
        const page=1
        const limit=1
        const appointmentBy="1"
        const expectedResult = [appointmentObject]
        const sortBy="appointmentBy"
        const sortDir="desc"
        mockFindMany.mockResolvedValueOnce(expectedResult);
        const foundAppointment = await getAppointmentsByUserId(appointmentBy, limit, page, sortBy, sortDir);
    
        expect(mockFindMany).toHaveBeenCalledWith(
            {
                orderBy: { [sortBy]: sortDir },
                where: { appointmentBy},
                take: limit,
                skip: (page - 1) * limit
            }
        )
        expect(foundAppointment).toEqual(expectedResult)
    });
});

describe('deleteAppointmentById', () => {
    //@ts-ignore
    const mockDeleteMany = prismaMock.appointment.deleteMany;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('it should return deleted appointment count when the correct arguments provided', async () => {
        const numberOfDeletedAppointments = 1;
        mockDeleteMany.mockResolvedValueOnce({ count: numberOfDeletedAppointments });
        const deletedAppointmentCount = await deleteAppointmentById("1", "2");
        expect(mockDeleteMany).toHaveBeenCalledWith({
            where: {
                id: "1",
                appointmentBy: "2"
            },
        });
        expect(deletedAppointmentCount).toEqual({ count: numberOfDeletedAppointments });
    });

    test('it should return the count of deleted appointments', async () => {
        mockDeleteMany.mockResolvedValueOnce({ count: 1 })
        const result = await deleteAppointmentById("11", "1")
        expect(mockDeleteMany).toHaveBeenCalledWith({
            where: {
                id: "11",
                appointmentBy: "1"
            },
        });
        expect(result).toEqual({ count: 1 })
    });

    test('it should return null if no appointment was deleted', async () => {
        mockDeleteMany.mockResolvedValueOnce({ count: 0 })
        const result = await deleteAppointmentById("-1", "-1")
        expect(mockDeleteMany).toHaveBeenCalledWith({
            where: {
                id: "-1",
                appointmentBy: "-1"
            },
        });
        expect(result).toEqual({ count: 0 })

    });
});
