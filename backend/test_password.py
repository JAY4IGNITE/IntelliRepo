from app.auth.password import hash_password, verify_password

password = "Hello@123"

hashed = hash_password(password)

print("Original:", password)
print("Hashed:", hashed)
print("Verified:", verify_password(password, hashed))