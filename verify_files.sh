#!/bin/bash

echo "📁 VERIFYING FRONTEND FILE STRUCTURE"
echo "======================================"
echo ""

check_file() {
  if [ -f "$1" ]; then
    echo "   ✅ $1"
  else
    echo "   ❌ MISSING: $1"
  fi
}

echo "1️⃣ Core Files:"
check_file "app.vue"
check_file "nuxt.config.ts"
check_file "package.json"
echo ""

echo "2️⃣ Layouts:"
check_file "layouts/default.vue"
check_file "layouts/auth.vue"
echo ""

echo "3️⃣ Middleware:"
check_file "middleware/auth.ts"
check_file "middleware/guest.ts"
echo ""

echo "4️⃣ Stores:"
check_file "stores/auth.ts"
echo ""

echo "5️⃣ Composables:"
check_file "composables/useApi.ts"
echo ""

echo "6️⃣ Types:"
check_file "types/index.ts"
echo ""

echo "7️⃣ Pages:"
check_file "pages/index.vue"
check_file "pages/dashboard.vue"
check_file "pages/auth/login.vue"
echo ""

echo "8️⃣ Students Pages:"
check_file "pages/students/index.vue"
check_file "pages/students/create.vue"
check_file "pages/students/[id].vue"
echo ""

echo "9️⃣ Teachers Pages:"
check_file "pages/teachers/index.vue"
check_file "pages/teachers/create.vue"
check_file "pages/teachers/[id].vue"
echo ""

echo "🔟 Classes Pages:"
check_file "pages/classes/index.vue"
check_file "pages/classes/create.vue"
check_file "pages/classes/[id].vue"
echo ""

echo "1️⃣1️⃣ Subjects Pages:"
check_file "pages/subjects/index.vue"
check_file "pages/subjects/create.vue"
check_file "pages/subjects/[id].vue"
echo ""

echo "1️⃣2️⃣ Components:"
check_file "components/Toast.vue"
echo ""

echo "1️⃣3️⃣ Assets:"
check_file "assets/css/main.css"
echo ""

echo "======================================"
echo "✅ File Structure Verification Complete!"
echo "======================================"
