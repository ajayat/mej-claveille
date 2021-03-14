
// Import dependencies
import { createContext } from 'react'

// Create dark and light theme context
export default createContext({
    darkTheme: Boolean,
    theme: Object,
    toggleTheme: state => {}
})