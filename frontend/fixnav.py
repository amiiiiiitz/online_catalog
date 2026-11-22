import re
for f in ['pages/SalesHome.tsx','pages/SalesCatalog.tsx','pages/SalesCustomers.tsx','pages/SalesNewReport.tsx','pages/SalesReports.tsx']:
    s=open(f).read()
    if "BottomNav" not in s:
        s=s.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport BottomNav from '../components/BottomNav';", 1)
    s=re.sub(r'<nav.*?</nav>', '<BottomNav />', s, count=1, flags=re.S)
    open(f,'w').write(s)
print('done')