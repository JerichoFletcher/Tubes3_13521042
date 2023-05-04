import prompt from 'prompt';
import { init, end, setDebugLevel, UserQueryConfig, acceptUserQuery } from "./backend/backendIntf.js";

function mainloop(){
    return new Promise(async(resolve, _) => {
        console.log('( ˘⌣˘)♡(˘⌣˘ ) ===== chwatGwiPwiTi v0.1 ===== ( ˘⌣˘)♡(˘⌣˘ )');
        setDebugLevel(1);
        
        prompt.start();
        let q = await prompt.get(['query']);
        while(q.query.toLowerCase() !== 'exit'){
            const config = new UserQueryConfig(1);
            config.algorithm = 'KMP';
            const a = await acceptUserQuery(q.query, config);
    
            console.log(`A: ${a.answer}`);
            q = await prompt.get(['query']);
        }
        resolve();
    });
}

async function headlessMain(){
    await init();
    await mainloop();
    console.log('(o^▽^o) Thank you for using chatGwiPwiTi v0.1 *:･ﾟ✧*:･ﾟ✧');
    await end();
}

headlessMain();
