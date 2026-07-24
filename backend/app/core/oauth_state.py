from uuid import uuid4

oauth_states = {}

def create_state(user_email: str):
    state = str(uuid4())
    oauth_states[state] = user_email
    return state

def get_email_from_state(state: str):
    return oauth_states.pop(state, None)