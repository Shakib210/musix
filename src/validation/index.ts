import loginValidation from "./loginValidation.js";
import signupValidation from "./signupValidation";
import albumValidation from "./album.validation.js";
import artistValidation from "./artist.validation.js";
import logValidation from "./log.validation.js";
import paymentValidation from "./payment.validation.js";
import permissionValidation from "./permission.validation.js";
import playlistValidation from "./playlist.validation.js";
import promotionValidation from "./promotion.validation.js";
import reviewValidation from "./review.validation.js";
import roleValidation from "./role.validation.js";
import songValidation from "./song.validation.js";
import stationValidation from "./station.validation.js";
import subscriptionPlanValidation from "./subscriptionPlan.validation.js";

const validators = {
	loginValidation,
	signupValidation,
	albumValidation,
	artistValidation,
	logValidation,
	paymentValidation,
	permissionValidation,
	playlistValidation,
	promotionValidation,
	reviewValidation,
	roleValidation,
	songValidation,
	stationValidation,
	subscriptionPlanValidation,
};

export default validators;
