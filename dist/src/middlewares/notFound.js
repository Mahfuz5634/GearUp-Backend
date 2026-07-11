const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Api not found!',
        error: " ",
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map