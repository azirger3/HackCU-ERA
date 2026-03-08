def sum(a, b):
    """
    Return the sum of a and b.

    Parameters
    ----------
    a : Any
        First input to sum
    b : Any
        Second input to sum

    Returns
    -------
    Any
        Sum of a and b
    """
    return a + b

def main():
	test_0_a = 1
	test_0_b = 2
	(test_0_out) = sum(test_0_a, test_0_b)
	assert test_0_out == 3, f'Expected {3}, but got {test_0_out}'

main()