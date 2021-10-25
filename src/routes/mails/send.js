/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
import mailchimpFactory from '@mailchimp/mailchimp_transactional';
const mailchimp = mailchimpFactory(import.meta.env.MAILCHIMP_API_CLIENT_SECRET);
export async function post({ body }) {
	let res = { body: {} };
	if (!body) res.body.er = 1;
	res.body.mailchimp = await mailchimp.users.ping();
	console.log(res);
	return {
		res
	};
}
