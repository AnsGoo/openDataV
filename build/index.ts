import { series, parallel } from 'gulp'
import { clean, buildModules, buildFull, generateTypes } from './task'

export default series(clean, parallel(buildModules, buildFull, generateTypes))
