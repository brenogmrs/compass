import 'reflect-metadata';
import app from './app';
import { connect } from './config/database/connection';
import './containers';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    await connect();

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Service running on port ${PORT} 🎉`);
    });
}

bootstrap();
