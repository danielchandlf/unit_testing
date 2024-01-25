export const getAppointment = async (appointmentId: string, userId: string) => {


    const data=[
        {
            appointmentId:"1",title:"hello",userId:userId
        },
        {
            appointmentId:"2",title:"hello",userId:userId
        }
    ]
    return data.filter(f=>f.appointmentId===appointmentId);
  };