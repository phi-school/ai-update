export const UpdateState = {
	Initializing: { status: 'Initializing', message: 'Initializing process' },
	SendingRequest: {
		status: 'SendingRequest',
		message: 'Sending request to API',
	},
	ResponseReceived: {
		status: 'ResponseReceived',
		message: 'ProviderResponse received',
	},
	HealingData: { status: 'HealingData', message: 'Attempting to heal data' },
	Success: { status: 'Success', message: 'Process completed successfully' },
	Error: { status: 'Error' },
} as const

type BaseState = {
	status: string
	message?: string
}

type SpecificState = {
	[K in keyof typeof UpdateState]: BaseState & { status: K }
}[keyof typeof UpdateState]

type ErrorState = BaseState & { status: 'error'; message: string }

export type UpdateStateType = SpecificState | ErrorState
