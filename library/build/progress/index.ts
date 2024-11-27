import progress from 'vite-plugin-vitebar'

export const createProgress = (env: Record<string, string>) => {
  const projectName = 'Vue Shop Vite'
  return progress({ env, projectName })
}
