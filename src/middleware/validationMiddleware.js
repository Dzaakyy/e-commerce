import validator from 'validator';

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!validator.isEmail(email)) errors.push('Invalid email format');
    if (!password || password.length < 3) errors.push('Password minimum 6 characters');
    
    if (errors.length > 0) return res.status(400).json({errors});
    
    next();
};



export const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    if (!username || username.length < 3) errors.push('Username minimum 3 characters');
    if (!validator.isEmail(email)) errors.push('Invalid email format');
    if (!password || password.length < 6) errors.push ('Password minimum 6 characters');
    
    if (errors.length > 0) return res.status(400).json({errors});
    
    next();
};

export const validateProduct = (req, res, next) => {
    const {name, description, price, stock, image } = req.body;
    const errors = [];

    if(!name || name.length < 3 ) errors.push('Product name minimum 3 characters');
    if(!description || description.length < 10) errors.push('Product description minimum 10 characters');
    if(!price || price <= 0) errors.push('Product price harus lebih dari 0')
    if(!stock || stock < 0) errors.push('Product stock minimum 0')
    if(!validator.isURL(image)) errors.push('Invalid image URL format');
    
    if(errors.length > 0 ) return res.status(400).json({errors});
    
    next();
};

export const validateCategory = (req, res, next) => {
    const { name, description} = req.body;
    const errors = [];

    if(!name || name.length < 3) errors.push('Category name minimum 3 characters');
    if(!description || description.lenth < 10)  errors.push('Category description minimum 10 characters');
    

    if(errors.length > 0)  return res.status(400).json({errors});
    
    next();
};

export const validateCart = (req, res, next) => {
    const errors = [];
    
    if(req.method === 'POST') {
        const { productId, quantity } = req.body;
        if (!productId) errors.push('Product ID is required');
        if (!quantity || quantity <= 0) errors.push('Quantity must be greater than 0');
    }
    else if (req.method === 'DELETE') {
        if (!req.params.productId) {
            errors.push('Product ID is required');  
        } 
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
};
