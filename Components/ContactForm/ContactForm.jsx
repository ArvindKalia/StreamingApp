import { FormDesign, Input } from "../../Tailwind";
import AWS from "aws-sdk";

const ses = new AWS.SES({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: "ca-central-1",
});
const ContactForm = () => {
  const fields = [
    {
      component: "input",
      props: {
        name: "fullname",
        placeholder: "Name",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        width: "full",
      },
    },
    {
      component: "input",
      props: {
        name: "email",
        placeholder: "Email",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        width: "full",
        type: "email",
      },
    },
    {
      component: "input",
      props: {
        name: "mobile",
        placeholder: "Mobile",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        width: "full",
        type: "number",
      },
    },
    {
      component: "input",
      props: {
        name: "message",
        placeholder: "Message",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        width: "full",
        textarea: true,
      },
    },
  ];
  const onSubmit = async (values) => {
    try {
      const options = {
        Destination: {
          ToAddresses: ["arvindkalia0143@gmail.com"],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: ` 
              <h1>${values.fullname}</h1>
              <h2>${values.email}</h2>
              <h3>${values.mobile}</h3>
              <h4>${values.message}</h4>
              `,
            },
            
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Contact Form",
          },
        },
        Source: "arvindkalia1995@gmail.com"
      };
      await ses.sendEmail(options).promise();
      alert("We will contact you shortly !");
    } catch (error) {
        console.log(error)
      alert("Please try again later");
    }
  };
  const design = (
    <>
      <FormDesign fields={fields} onSubmit={onSubmit} />
    </>
  );
  return design;
};
export default ContactForm;
