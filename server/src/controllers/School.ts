import {Request, Response} from 'express';
import {School} from '../entity/School';
import Joi from 'joi';


module.exports = {

	/**
   * Get all controller
   * @async
   */
	get: async (req: Request, res: Response, next: any) => {
		try {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const start = parseInt((req.query?.start) || 0);

			const name = req.query?.name;

			if (isNaN(start)) {
				res.status(400).json({error: 'Invalid start value'});
				return;
			}


			// if name has a length then search for school with name that is similar to the name

			if (name) {
				const queryBuilder = School.createQueryBuilder('school');
				const schools = await queryBuilder.where('school.name like :name', {name: `%${name}%`}).skip(start).take(10).getMany();
				return res.status(200).send(schools);
			}

			const schools = await School.find({skip: start, take: 10});
			return res.status(200).send(schools);
		} catch (error) {
			next(error);
		}
	},

	post: async (req: Request, res: Response, next: any) => {
		try {
			const body = req.body;

			body.appClient = body.appClient === 'true' || body.appClient === true;
			const data = JSON.parse(JSON.stringify(body));

			delete data.school_logo;

			const resp = schoolValidator.validate(data);

			if (resp.error) {
				res.status(500).json(resp.error);
				return;
			}

			// validate file using multer

			const school = new School();
			school.name = req.body.name;
			school.address = req.body.address;
			school.schoolLogo = `${req.file.path}`;
			school.status = req.body.status;
			school.email = req.body.email;
			school.phoneNumber = req.body.phoneNumber;
			school.countryCode = req.body.countryCode;
			school.website = req.body.website;
			school.noOfStudents = req.body.noOfStudents;
			school.about = req.body.about;
			// school.school_logo = req.body.school_logo;
			school.filemaker = req.body.filemaker;
			school.brandColor1 = req.body.brandColor1;
			school.brandColor2 = req.body.brandColor2;
			school.appClient = req.body.appClient;
			school.createdAt = new Date();
			school.updatedAt = new Date();


			try {
				await school.save();
			} catch (err) {
				res.status(500).json({
					details: [{
						message: 'email already in use',
						context: {
							key: 'email',
						}
					}]
				});
				return;
			}
      
			res.status(200).send(school);
			return ;
		} catch (error) {
			next(error);
		}
	}


};


// school_logo: Joi.string().uri({ allowRelative: false }).required(), // Ensure absolute URL format

const schoolValidator = Joi.object({
	name: Joi.string().trim().required(),
	status: Joi.string().valid('pending', 'published').required(),
	address: Joi.string().trim().required(),
	about: Joi.string().trim().required(),
	filemaker: Joi.string().trim().required(),
	noOfStudents: Joi.number().integer().min(0).required(),
	website: Joi.string().uri({allowRelative: false}).required(),
	countryCode: Joi.string().trim().pattern(/\+[0-9]{1,4}$/).required(),
	phoneNumber: Joi.string().trim().pattern(/[0-9]{6,11}$/).required(),
	email: Joi.string().email().required(),
	brandColor1: Joi.string().trim().allow(null, ''),
	brandColor2: Joi.string().trim().allow(null, ''),
	appClient: Joi.boolean().required(),
});
