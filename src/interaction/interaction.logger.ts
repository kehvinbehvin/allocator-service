import logger from "../utils/logger/src/logger"

const interactionLogger = logger.child({
   channel: 'interaction' ,
})

export default interactionLogger;