import { ReactNode } from 'react'

export interface Job {
  id: string
  companyName: string
  companyLogo: string
  position: string
  location: string
  employmentType: string
  salary: string
  postedTime: string
  employees: string
  description: string
  aboutStartup: string
  jobHighlights: {
    title: string
    subtitle: string
    icon: ReactNode
  }[]
  tags: string[]
}

