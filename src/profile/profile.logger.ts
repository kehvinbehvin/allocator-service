import logger from "../utils/logger/src/logger"

const profileLogger = logger.child({
   channel: 'profile' ,
})

export default profileLogger;