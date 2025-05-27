const pool = require('../db/database');

exports.setId = async (req, res) => {
    const {id, dep, stage, counter} = req.body;
    if(!id || !dep || !stage || !counter) {
        return res.status(400).json({error: 'fill all fields'});
    }
    console.log('counter:', counter)
    try {
        const user = await pool.query(
            'SELECT * from usersbase WHERE id = $1',
            [id]
        ) 
        if (user.rows.length > 0) {
            const updatedUser = await pool.query(
                'UPDATE usersbase SET dep = $1, stage = $2, counter = $4 WHERE id = $3 RETURNING *',
                [dep, stage, id, counter]
            )
            res.json(updatedUser.rows[0]);
        } else {
            const newUser =  await pool.query(
                'INSERT INTO usersbase (id, dep, stage, counter) VALUES ($1, $2, $3, $4) RETURNING *',
                [id, dep, stage, counter]
            )
            res.json(newUser.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
};

exports.checkId = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await pool.query(
            'SELECT * from usersbase WHERE id = $1',
            [id]
        )
        if (user.rows.length === 0) {
            return res.status(404).json({error: 'Id not found'});
        } else {
            res.json(user.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: err.message});
    }
}