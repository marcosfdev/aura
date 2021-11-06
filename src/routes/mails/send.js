/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
//getting mailchimp
import mailchimpFactory from '@mailchimp/mailchimp_transactional';
const mailchimp = mailchimpFactory(import.meta.env.VITE_MAILCHIMP_API_KEY);

//post endpoint
export async function post({ body }) {
	//creating async function to get data from mailchimp
	const run = async () => {
		//send email with mailchimp api
		//Documentation for object: https://mailchimp.com/developer/transactional/api/messages/send-new-message
		//Documentation for nodejs api: https://www.npmjs.com/package/@mailchimp/mailchimp_transactional
		//FIXME returning 500 error i dont know why.
		const res = await mailchimp.messages.send({
			message: {
				html: `${body.textfield} <br/> Phone Number: ${body.phone}`,
				subject: 'Contact From',
				from: 'marc@marcpbrien.co',
				to: [{ email: body.email, name: body.name }],
				important: false
			}
		});
		return res;
	};
	//sending back response from mailchimp
	return {
		body: {
			mailchimp: await run()
		}
	};
}
