import { app } from './app';


app.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log('Servidor rodadndo.✔');
});