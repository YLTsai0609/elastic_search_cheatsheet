import pandas as pd
import numpy as np
import sys

size = int(sys.argv[1]) # matrix size 
output = sys.argv[2] # file_name or output json
matrix = np.random.random(size=(size, size))

df = pd.DataFrame(matrix, dtype='str')
df.to_json(output,orient='records',lines=True)

