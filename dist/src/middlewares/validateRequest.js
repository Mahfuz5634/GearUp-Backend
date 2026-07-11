import catchAsync from "../utils/catchAsync";
const validateRequest = (schema) => {
    return catchAsync(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
        });
        next();
    });
};
export default validateRequest;
//# sourceMappingURL=validateRequest.js.map