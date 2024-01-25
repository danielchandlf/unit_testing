import { Response, NextFunction, Request } from 'express';
import sinon from 'sinon';
import * as appointmentService from '@/modules/appointments/services/appointment.service';
import {
    createAppointment,
    deleteAppointment,
    getAppointment,
    getUserCreatedAppointments,
    updateAppointment
} from '@/modules/appointments/controllers/appointment.controller';
import { RequestWithUser } from '@/common/interfaces/express.interface';
import { Result } from '@/common/core/Result';



describe('getUserCreatedAppointments', () => {
    let appointmentServiceStub: sinon.SinonStub;
    let reqWithUser: RequestWithUser;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        appointmentServiceStub = sinon.stub(
            appointmentService,
            'getUserCreatedAppointments'
        );
        reqWithUser = {
            user: { id: '10' }
        } as unknown as RequestWithUser;
        req = {} as Request;
        res = {
            status: sinon.stub().returns({
                json: sinon.stub()
            })
        } as unknown as Response;
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    test('it should return user created appointments successfully', async () => {
        const mockGetUserCreatedAppointments = jest.spyOn(appointmentService, 'getUserCreatedAppointments');

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next: NextFunction = jest.fn();

        const mockAppointments = [
            {
                id: "string",
                title: "string",
                date: new Date("2023-11-08T10:26:18.679Z"),
                appointmentBy: "10",
                appointmentFor: "string",
                isConfirmed: false,
                purpose: "string",
                symptoms: "string",
                isCancelled: false,
                createdAt: new Date("2023-11-08T10:26:18.679Z"),
                updatedAt: new Date("2023-11-08T10:26:18.679Z")
            }

        ]
        mockGetUserCreatedAppointments.mockResolvedValue(mockAppointments);
        await getUserCreatedAppointments(reqWithUser, res as Response, next);

        expect(mockGetUserCreatedAppointments).toHaveBeenCalledWith(
            {
                userId: reqWithUser.user.id
            }
        )
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(Result.ok(mockAppointments));
    })
});

describe('createAppointment', () => {
    let req: Request;
    let reqWithUser: RequestWithUser;
    let res: Response;
    let next: NextFunction;
    let appointmentServiceStub: sinon.SinonStub;

    beforeEach(() => {
        req = {
            body: {
                title: 'Test Appointment'
            }
        } as Request;

        reqWithUser = {
            user: {
                id: 'user-id-123'
            },
            ...req
        } as unknown as RequestWithUser;

        res = {
            status: sinon.stub().returns({
                json: sinon.stub()
            })
        } as unknown as Response;

        next = sinon.stub() as NextFunction;

        appointmentServiceStub = sinon.stub(
            appointmentService,
            'createAppointment'
        );
    });

    afterEach(() => {
        sinon.restore();
    });

    test('it should return created appointment with appointment dto', async () => {
        const expectedResult = {
            title: 'Test Appointment'
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();
        appointmentServiceStub.resolves(req.body);
        await createAppointment(reqWithUser, res as Response, next);
        sinon.assert.calledWith(res.status, 201);
        const responseJson = res.json.getCall(0).args[0];
        expect(responseJson.data).toEqual((expectedResult));


    });
});

describe('getAppointment', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let appointmentServiceStub: sinon.SinonStub;

    beforeEach(() => {
        appointmentServiceStub = sinon.stub(
            appointmentService,
            'getAppointment'
        );
        req = {
            params: { id: '1' },
            user: { id: '123' }
        } as unknown as Request;
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        } as Response;
        next = sinon.stub();

    });

    afterEach(() => {
        sinon.restore();
    });

    test('it should return appointment with valid user id and appointment id', async () => {
        const mockGetAppointment = jest.spyOn(appointmentService, 'getAppointment');
        const resolvedResult = {
            id: 1,
            userId: 2
        }
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();
        appointmentServiceStub.resolves(resolvedResult);

        await getAppointment(req, res as Response, next);
        expect(mockGetAppointment).toHaveBeenCalledWith(req.params.id, (req as RequestWithUser).user.id);
        const responseJson = res.json.getCall(0).args[0];
        expect(responseJson.data).toEqual(resolvedResult);


    });
});

describe('deleteAppointment', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let deleteAppointmentStub: sinon.SinonStub;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            user: { id: '123' }
        } as unknown as Request;
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        } as Response;
        next = sinon.stub() as NextFunction;
        deleteAppointmentStub = sinon.stub(appointmentService, 'deleteAppointment');
    });

    afterEach(() => {
        sinon.restore();
    });

    test('it should return success when valid id given', async () => {
        const mockDeleteAppointment = jest.spyOn(appointmentService, 'deleteAppointment');
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();
        deleteAppointmentStub.resolves("success");
        await deleteAppointment(req, res as Response, next);
        expect(mockDeleteAppointment).toHaveBeenCalledWith(
            req.params.id,
            (req as RequestWithUser).user.id
        )
        const responseJson = res.json.getCall(0).args[0];
        expect(responseJson.data).toEqual("success");


    });

});

describe('updateAppointment', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;
    let updateAppointmentStub: sinon.SinonStub;

    beforeEach(() => {
        req = {
            body: {
                title: "example"
            },
            params: { id: '1' },
            user: { id: '123' }
        } as unknown as Request;
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis()
        } as unknown as Response;
        next = sinon.stub() as NextFunction;
        updateAppointmentStub = sinon.stub(appointmentService, 'updateAppointment');
    });

    afterEach(() => {
        sinon.restore();
    });

    test('it should return success message when valid appointment id and payload', async () => {
        const mockUpdateAppointment = jest.spyOn(appointmentService, 'updateAppointment');

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        const next = sinon.stub();
        mockUpdateAppointment.mockResolvedValue("success")
        await updateAppointment(req, res as Response, next);
        expect(mockUpdateAppointment).toHaveBeenCalledWith(
            req.params.id, {
            ...req.body,
            appointmentBy: (req as RequestWithUser).user.id
        }
        )
        const responseJson = res.json.getCall(0).args[0];
        expect(responseJson.data).toEqual("success");


    });
});
